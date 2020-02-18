using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API resource
            CreateMap<Make, MakeResource>(); 
            CreateMap<Model, ModelResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.contactName, Phone = v.contactPhone, Email = v.contactEmail }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));

            // API resource to domain
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.contactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.contactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.contactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    // Remove unselected vehicles

                    var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                    foreach (var r in removedFeatures)
                    {
                        v.Features.Remove(r);
                    }

                    // Add new features

                    var addFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id });
                    foreach (var f in addFeatures)
                    {
                        v.Features.Add(f);
                    }

                }); 
        }
    }
}