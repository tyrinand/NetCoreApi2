using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Api_work.Models;
using Api_work.Service.Repository;

namespace Api_work.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
    }
}