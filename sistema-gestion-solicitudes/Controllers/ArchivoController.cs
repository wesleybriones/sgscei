using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_gestion_solicitudes.Models;

namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArchivoController : ControllerBase
    {
        private readonly GestionContext DBContext;

        public ArchivoController(GestionContext context)
        {
            DBContext = context;
        }

        // GET: api/Archivo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Archivo>>> GetArchivo()
        {
          if (DBContext.Archivo == null)
          {
              return NotFound();
          }
            return await DBContext.Archivo.ToListAsync();
        }

        // GET: api/Archivo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Archivo>> GetArchivo(int id)
        {
          if (DBContext.Archivo == null)
          {
              return NotFound();
          }
            var archivo = await DBContext.Archivo.FindAsync(id);

            if (archivo == null)
            {
                return NotFound();
            }

            return archivo;
        }


        [HttpGet]
        [Route("/api/ArchivosBySolicitud/{id}")]
        public async Task<ActionResult<IEnumerable<Archivo>>> GetArchivosBySolicitud(int id)
        {
            if (DBContext.Archivo == null)
            {
                return NotFound();
            }
            var archivos = await DBContext.Archivo.Where(s => s.SolicitudDetalleId == id)
                .Include(s => s.TipoArchivo)
                .Include(s => s.Usuario)
                .ToListAsync();

            return archivos;
        }


        [HttpGet]
        [Route("/api/ArchivosByType/")]
        public async Task<ActionResult<IEnumerable<Archivo>>> FilterDocumentByType(int id, string tipo)
        {
            if (DBContext.Archivo == null)
            {
                return NotFound();
            }
            var archivos = await DBContext.Archivo.Where(s => s.SolicitudDetalleId == id && s.TipoArchivo.Nombre == tipo)
                .Include(s => s.TipoArchivo)
                .Include(s => s.Usuario)
                .ToListAsync();

            return archivos;
        }





        // PUT: api/Archivo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArchivo(int id, Archivo archivo)
        {
            if (id != archivo.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(archivo).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArchivoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Archivo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Archivo>> PostArchivo(Archivo archivo)
        {
          if (DBContext.Archivo == null)
          {
              return Problem("Entity set 'GestionContext.Archivo'  is null.");
          }
            var newFile  = new Archivo
            {
                Nombre = archivo.Nombre,
                SolicitudDetalleId = archivo.SolicitudDetalleId,
                URL = archivo.URL,
                FechaCreacion = DateTime.Now,
                NumeroDescargas = 0,
                Extension = archivo.Extension,
                UsuarioId = archivo.UsuarioId,
                TipoArchivoId = archivo.TipoArchivoId
            };
            DBContext.Archivo.Add(newFile);
            await DBContext.SaveChangesAsync();

            return StatusCode(200,  newFile);
        }



        [HttpPost]
        [Route("/api/Archivos/Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Archivo>> CreateArchivo(List<Archivo> archivos)
        {
            if (DBContext.Archivo == null)
            {
                return BadRequest();
            }

            foreach (Archivo file in archivos)
            {
                var newFile = new Archivo { Nombre = file.Nombre, SolicitudDetalleId = file.SolicitudDetalleId, URL = file.URL , 
                    FechaCreacion = DateTime.Now , NumeroDescargas = 0, Extension = file.Extension, UsuarioId = file.UsuarioId, 
                    TipoArchivoId = file.TipoArchivoId};

                DBContext.Archivo.Add(newFile);
                await DBContext.SaveChangesAsync();

            }
            return Ok();


        }


        // DELETE: api/Archivo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArchivo(int id)
        {
            if (DBContext.Archivo == null)
            {
                return NotFound();
            }
            var archivo = await DBContext.Archivo.FindAsync(id);
            if (archivo == null)
            {
                return NotFound();
            }

            DBContext.Archivo.Remove(archivo);
            await DBContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ArchivoExists(int id)
        {
            return (DBContext.Archivo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
