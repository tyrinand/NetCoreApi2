using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Api_work.Models;
using Api_work.Service.Repository;

namespace Api_work.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SoftController : ControllerBase
    {
        private readonly ILogger<SoftController> _logger;

        private ISoftRepository _repo;

        public SoftController(ILogger<SoftController> logger, ISoftRepository repository)
        {
            _logger = logger;
            _repo = repository;
        }

        [HttpGet]
        public async Task<PageDate<Soft>> GetSoft([FromQuery] PagesParams pagesParams)
        {
            return await _repo.GetList(pagesParams);
        }

        [HttpGet("{id}")]
        public async Task<Soft> GetSoft(int id)
        {
            return await _repo.GetSoft(id);
        }

        [HttpPost]
        public async Task<bool> CreateSoft(Soft soft)
        {
            return await _repo.Create(soft);
        }

        [HttpDelete("{id}")]
        public async Task<bool> DeleteClient(int id)
        {
            return await _repo.Delete(id);
        }

        [HttpPut]
        public async Task<bool> Update(Soft soft)
        {
            return await _repo.Update(soft);
        }
    }
}