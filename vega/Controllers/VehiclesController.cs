using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;
        public VehiclesController(IMapper mapper, IUnitOfWork unitOfWork, IVehicleRepository vehicleRepository)
        {
            this.unitOfWork = unitOfWork;
            this.vehicleRepository = vehicleRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                System.Console.WriteLine("model state bad: ");
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            vehicleRepository.AddVehicle(vehicle);
            await unitOfWork.CompleteAsync();

            vehicle = await vehicleRepository.GetVehicle(vehicle.Id);
            var vr = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vr);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await vehicleRepository.GetVehicle(id);

            if (vehicle == null)
            {
                return NotFound(id);
            }

            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await unitOfWork.CompleteAsync();

            vehicle = await vehicleRepository.GetVehicle(vehicle.Id);
            var vr = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vr);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
            {
                return NotFound(id);
            }

            vehicleRepository.DeleteVehicle(vehicle);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id);

            if (vehicle == null)
            {
                return NotFound(id);
            }

            var vr = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vr);
        }

        [HttpGet()]
        public async Task<IActionResult> GetVehicles()
        {
            var vehicles = await vehicleRepository.GetVehicles();

            if (vehicles == null)
            {
                return NotFound();
            }

            var vehicleResources = new List<VehicleResource>();
            foreach (var vehicle in vehicles)
            {
                vehicleResources.Add(mapper.Map<Vehicle, VehicleResource>(vehicle));
            }

            return Ok(vehicleResources);
        }
    }
}