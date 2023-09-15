using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sistema_gestion_solicitudes.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudController : ControllerBase
    {

        private readonly GestionContext DBContext;

        public SolicitudController(GestionContext DBContext)
        {
            this.DBContext = DBContext;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Solicitud>>> GetSolicitudes()
        {
            return await DBContext.Solicituds.ToListAsync();
        }

        [HttpGet]
        [Route("/api/SolicitudesByUserId/{id}")]
        public ActionResult<IEnumerable<Solicitud>> GetSolicitudesByUser(int id)
        {
            var solicitudes = DBContext.Solicituds.OrderByDescending(s=> s.Id)
                                                   .Where(u => u.UsuarioId == id)
                                                   .Include(u => u.Estado)
                                                   .Include(u=> u.Resolucion)
                                                   .ToList();
                          
            if(solicitudes != null)
            {

                return solicitudes;
            }
            else
            {
                return NotFound();
            }

            
        }


        [HttpGet]
        [Route("/api/Solicitud/{id}")]
        public ActionResult<Solicitud> GetSolicitud(int id)
        {
            
            var solicitud =  DBContext.Solicituds
                            .Where(s => s.Id == id)
                            .Include(s => s.Usuario)
                            .Include(s => s.Estado)
                            .Include(s => s.Resolucion)
                                .ThenInclude(s => s.Archivo)
                            .Include(s => s.SolicitudDetalle)
                                .ThenInclude(s => s.Anexos)
                                    .ThenInclude(s => s.TipoAnexo)
                            .Include(s => s.SolicitudDetalle)
                                .ThenInclude(s => s.Asignaciones)
                                    .ThenInclude(s => s.UserAsignado)
                            .FirstOrDefault();

            if (solicitud == null)
            {
                return NotFound();
            }

            return solicitud;

        }




        [HttpPost]
        [Route("/api/Solicitud/Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public  async Task<ActionResult<Solicitud>> Create(Solicitud solicitud)
        {
            //User? usuario = await DBContext.Users.FindAsync(solicitud.UsuarioId);

            var Usuario = await DBContext.Users.FindAsync(solicitud.UsuarioId);       
                               
            if (Usuario != null)
            {  
                var nuevaSolicitud = new Solicitud{Titulo = solicitud.Titulo,FechaCreacion = DateTime.Now, UsuarioId = solicitud.UsuarioId ,EstadoId = 1};
                DBContext.Solicituds.Add(nuevaSolicitud);

                DBContext.SaveChanges();
                nuevaSolicitud.Codigo = "C-" + nuevaSolicitud.Id;
                var solicitudDetalle = new SolicitudDetalle { SolicitudId = nuevaSolicitud.Id };
                DBContext.Add(solicitudDetalle);
                DBContext.SaveChanges();
                return StatusCode(200,nuevaSolicitud);

            }
            else
            {
                return NotFound();
            }
            
            

        }


        [HttpPut]
        [Route("/api/Solicitud/{id}")]
        public async Task<IActionResult> PutSolicitud(int id, Solicitud solicitud)
        {
            if (id != solicitud.Id)
            {
                return BadRequest();
            }

            DateTime date = DateTime.Now;
            if(solicitud.EstadoId == 3 && solicitud.FechaRevision == null)
            {
                solicitud.FechaRevision = date.ToLocalTime();
            }
            else if (solicitud.EstadoId == 7 && solicitud.FechaCierre == null)
            {              
                solicitud.FechaCierre = date.ToLocalTime();
            }

            DBContext.Entry(solicitud).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolicitudExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }


        private bool SolicitudExists(int id)
        {
            return (DBContext.Solicituds?.Any(e => e.Id == id)).GetValueOrDefault();
        }


    }
}
