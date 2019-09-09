using AutoMapper;
using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // @ TEMPLATE 
            CreateMap<Infrastructure.Domain.Template, TemplateModel>(MemberList.Destination);
            CreateMap<TemplateModel, Infrastructure.Domain.Template>(MemberList.None);

            CreateMap<Infrastructure.Domain.Template, TemplateViewModel>(MemberList.Destination);

        }
    }
}
