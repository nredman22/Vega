using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;

namespace vega.Persistence
{

    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;

        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated) 
                return await context.Vehicles.FindAsync(id);
            
            return await context.Vehicles
                .Include(v => v.Features).ThenInclude(vf => vf.Feature)
                .Include(v => v.Model).ThenInclude(vm => vm.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void AddVehicle(Vehicle vehicle) 
        {
            context.Vehicles.Add(vehicle);
        }

        public void DeleteVehicle(Vehicle vehicle) 
        {
            context.Vehicles.Remove(vehicle);
        }

        public async Task<ICollection<Vehicle>> GetVehicles()
        {
            return await context.Vehicles
                .Include(v => v.Model).ThenInclude(vm => vm.Make).ToListAsync();
        }

        public async Task<ICollection<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
        }
    }
}