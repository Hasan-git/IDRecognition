using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository.Template
{
    public class TemplateRepository : BaseRepository<Domain.Template>, ITemplateRepository
    {
        public TemplateRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }
    }
    
}
