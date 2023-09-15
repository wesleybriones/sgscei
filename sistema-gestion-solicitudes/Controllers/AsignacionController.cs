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
    public class AsignacionController : ControllerBase
    {
        private readonly GestionContext DBContext;

        public AsignacionController(GestionContext context)
        {
            DBContext = context;
        }

        // GET: api/Asignacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asignacion>>> GetAsignacion()
        {
          if (DBContext.Asignacion == null)
          {
              return NotFound();
          }
            return await DBContext.Asignacion.ToListAsync();
        }

        // GET: api/Asignacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Asignacion>> GetAsignacion(int id)
        {
          if (DBContext.Asignacion == null)
          {
              return NotFound();
          }
            var asignacion = await DBContext.Asignacion.FindAsync(id);

            if (asignacion == null)
            {
                return NotFound();
            }

            return asignacion;
        }


        // PUT: api/Asignacion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsignacion(int id, Asignacion asignacion)
        {
            if (id != asignacion.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(asignacion).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsignacionExists(id))
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

        // POST: api/Asignacion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Asignacion>> PostAsignacion(Asignacion asignacion)
        {
          if (DBContext.Asignacion == null)
          {
              return Problem("Entity set 'GestionContext.Asignacion'  is null.");
          }
            DBContext.Asignacion.Add(asignacion);
            await DBContext.SaveChangesAsync();

            return CreatedAtAction("GetAsignacion", new { id = asignacion.Id }, asignacion);
        }

        // DELETE: api/Asignacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsignacion(int id)
        {
            if (DBContext.Asignacion == null)
            {
                return NotFound();
            }
            var asignacion = await DBContext.Asignacion.FindAsync(id);
            if (asignacion == null)
            {
                return NotFound();
            }

            DBContext.Asignacion.Remove(asignacion);
            await DBContext.SaveChangesAsync();

            return Ok();
        }

        private bool AsignacionExists(int id)
        {
            return (DBContext.Asignacion?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        [Route("/api/Asignaciones/New")]
        public async Task<ActionResult<Asignacion>> CreateAsignaciones(List<Asignacion> asignaciones)
        {
            if (DBContext.Asignacion == null)
            {
                return BadRequest();
            }


                foreach (Asignacion asignacion in asignaciones)
                {
                    DBContext.Asignacion.Add(new Asignacion
                    {
                        SolicitudDetalleId = asignacion.SolicitudDetalleId,
                        UserAsignadoId = asignacion.UserAsignadoId,
                        FechaAsignacion = DateTime.Now
                    });
                    await DBContext.SaveChangesAsync();
                }

            return Ok();
        }




    }
}
