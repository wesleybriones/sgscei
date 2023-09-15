using Microsoft.AspNetCore.Mvc;
using sistema_gestion_solicitudes.Models;
using Microsoft.EntityFrameworkCore;

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


        [HttpGet]
        [Route("/api/RevisoresDisponibles")]

        public async Task<ActionResult<IEnumerable<User>>> GetRevisoresDisponibles()
        {
            var usuarios = await DBContext.Users.Where(s => s.Estado == true && s.Roles.Any(s => s.Nombre =="Miembro del Comité"))
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
                var user = new User
                {
                    Nombres = usuario.Nombres,
                    Apellidos = usuario.Apellidos,
                    Cedula = usuario.Cedula,
                    Username = usuario.Username,
                    Correo = usuario.Correo,
                    Estado = usuario.Estado,
                    FechaCreacion = DateTime.Now
                };

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




    }
}

