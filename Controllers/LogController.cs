using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Api_work.Models;
using Api_work.Service.Repository;

namespace Api_work.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

    public class LogController : ControllerBase 
    {

        private readonly ILogger<LogController> _logger;

        private ILogRepository _repo;

        public LogController(ILogger<LogController> logger, ILogRepository repository)
        {
            _logger = logger;
            _repo = repository;
        }

        [HttpGet]
        public async Task<PageDate<LogRow>> GetLog([FromQuery] PagesParams pagesParams)
        {
            return await _repo.GetList(pagesParams);
        }

        [HttpGet]
        [Route("/api/Log/CreateError")]
        public void CreateError()
        {
            throw new System.Exception("User Error");
        }
    }
}