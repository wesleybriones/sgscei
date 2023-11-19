using Microsoft.AspNetCore.Mvc;
using sistema_gestion_solicitudes.Models;
using Microsoft.EntityFrameworkCore;

using System.Security.Cryptography;
using System.Text;

using Microsoft.AspNetCore.Identity;
using System.Runtime.Intrinsics.Arm;

namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly GestionContext DBContext;

        public UserController(GestionContext DBContext)
        {
            this.DBContext = DBContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsuarios()
        {
            var usuarios = await DBContext.Users
                        .Include(e => e.Especialidades)
                        .Include(e=> e.Roles)
                        .ToListAsync();

            return usuarios;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (DBContext.Users == null)
            {
                return NotFound();
            }
            var usuario = await DBContext.Users
                            .Include(e => e.Especialidades)
                            .Include(e => e.Roles)
                            .FirstOrDefaultAsync(s => s.Id == id);
;
              

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        [HttpGet]
        [Route("/api/RevisoresDisponibles")]
        public async Task<ActionResult<IEnumerable<User>>> GetRevisoresDisponibles()
        {
            var usuarios = await DBContext.Users.Where(s => s.Estado == true && s.Roles.Any(s => s.Nombre =="Miembro del Comité"))
                        .ToListAsync();

            return usuarios;
        }



        [HttpPost]
        [Route("/api/auth")]
        public async Task<ActionResult<User>> LoginUser(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest("El correo electrónico y la contraseña son obligatorios.");
            }
            var usuario = await DBContext.Users.FirstOrDefaultAsync(u => u.Correo == email);
            if (usuario == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            var sha = SHA256.Create();
            var asByteArryay = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArryay);
            var pass = Convert.ToBase64String(hashedPassword);
            
            if (pass.Equals(usuario.ContrasenaHash))
            {
                var userLog = new User
                {
                    Nombres = usuario.Nombres,
                    Apellidos = usuario.Apellidos,
                    Cedula = usuario.Cedula,
                    Correo = usuario.Correo,
                    Estado = usuario.Estado,
                    
                };
                return Ok(userLog);
            }
            else
            {
                return Unauthorized("Credenciales inválidas.");
            }
        }

        [HttpPost]
        [Route("/api/NewUsers")]
        public async Task<IActionResult> CreateUser(User usuario)
        {
            if (!ModelState.IsValid || await DBContext.Users.AnyAsync(x => x.Correo == usuario.Correo || x.Username == usuario.Username))
            {
                return BadRequest();
            }
            else
            {
                var user = new User();
                var sha = SHA256.Create();
                var password = usuario.ContrasenaHash;
                if (!string.IsNullOrEmpty(password))
                {
                    var asByteArryay = Encoding.Default.GetBytes(password);
                    var hashedPassword = sha.ComputeHash(asByteArryay);
                    var pass = Convert.ToBase64String(hashedPassword);
                    user = new User
                    {
                        Nombres = usuario.Nombres,
                        Apellidos = usuario.Apellidos,
                        Cedula = usuario.Cedula,
                        Username = usuario.Username,
                        ContrasenaHash = pass,
                        Correo = usuario.Correo,
                        Estado = usuario.Estado,
                        FechaCreacion = DateTime.Now
                    };
                }
                else
                {
                    ModelState.AddModelError("ContrasenaHash", "La contraseña no puede estar vacía.");
                }
                
                foreach (Especialidad esp in usuario.Especialidades)
                {
                    var especialidad = DBContext.Especialidades.FirstOrDefault(e => e.Id == esp.Id);

                    {
                        if (especialidad != null)
                        {
                            user.Especialidades.Add(especialidad);
                            especialidad.Usuarios.Add(user);
                            
                        }
                    }
                }
                foreach (Role rol in usuario.Roles)
                {
                    var role = DBContext.Roles.Find(rol.Id);
                    {
                        if (role != null)
                        {
                            user.Roles.Add(role);
                            role.Usuarios.Add(user);
                        }
                           
                    }
                }
                DBContext.Users.Add(user);
                await DBContext.SaveChangesAsync();
                return Ok();
            }

        }

        [HttpPost]
        [Route("/api/Register")]
        public async Task<IActionResult> PostUser(User usuario)
        {
            if (!ModelState.IsValid || await DBContext.Users.AnyAsync(x => x.Correo  == usuario.Correo || x.Username == usuario.Username))
            {
                return BadRequest();
            }
            else
            {
                usuario.FechaCreacion = DateTime.Now;
                DBContext.Users.Add(usuario);
                DBContext.SaveChanges();
                return Ok();

            }

        }


        
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var usuario = await DBContext.Users
                            .Include(e => e.Especialidades)
                            .Include(e => e.Roles)
                            .FirstOrDefaultAsync(s => s.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }
            try
            {
                if (usuario.Roles.Any(role => role.Nombre != "Presidente"))
                {
                    return BadRequest("No puedes eliminar un usuario si no eres administrador o presidente.");
                }
                DBContext.Users.Remove(usuario);
                await DBContext.SaveChangesAsync();

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar el usuario: {ex.Message}");
            }
        }
    }
}