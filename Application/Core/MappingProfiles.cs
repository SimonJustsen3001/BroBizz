using AutoMapper;
using BroBizz.Models;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<BroBizzDevice, BroBizzDevice>();
        }
    }
}