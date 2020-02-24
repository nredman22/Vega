using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
        void AddVehicle(Vehicle vehicle);
        void DeleteVehicle(Vehicle vehicle);
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<ICollection<Vehicle>> GetVehicles();
    }
}