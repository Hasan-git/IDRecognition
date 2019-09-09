using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using BackEnd.Extensions;
using BackEnd.Models;
using Infrastructure;
using Infrastructure.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplatesController : ControllerBase
    {

        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public TemplatesController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        // GET api/templates
        [HttpGet]
        public ActionResult<IEnumerable<TemplateViewModel>> Get()
        {
            try
            {
                var templates = _uow.TemplateRepository.AsQueryable().ToList();
                var mapped = _mapper.Map<List<TemplateViewModel>>(templates);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // GET api/templates/5
        [HttpGet("{id}")]
        public ActionResult<TemplateModel> Get(string id)
        {
            try
            {
                var template = _uow.TemplateRepository.GetById(id);
                var mapped = _mapper.Map<TemplateModel>(template);

                return Ok(mapped);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        // POST api/templates
        [HttpPost]
        public ActionResult<TemplateModel> Post([FromBody]TemplateModel value)
        {
            try
            {
                var template = _mapper.Map<Template>(value);
                var createdTemplate = _uow.TemplateRepository.Add(template);
                var mapped = _mapper.Map<TemplateModel>(createdTemplate);
                return Ok(mapped);
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        [HttpPost("recognize")]
        public ActionResult<List<OCRResult>> Recognize(IFormFile file, [FromForm] string templateId)
        {
            try
            {
                if (templateId == null) return BadRequest("No template id was found.");
                if (file == null || file.Length == 0) return BadRequest("No image was found.");

                var template = _uow.TemplateRepository.GetById(templateId);

                var result = TemplateExtension.RecogizeAreas(file, template);

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
