using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Api_work.Models;
using Api_work.Service.Repository;

namespace Api_work.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

    public class SaleController : ControllerBase
    {
        private readonly ILogger<SaleController> _logger;
        private ISaleRepository _repo;

        public SaleController(ILogger<SaleController> logger, ISaleRepository repository)
        {
            _logger = logger;
            _repo = repository;
        }

        [HttpGet]
        public async Task<PageDate<SaleView>> GetSales([FromQuery] PagesParams pagesParams)
        {
            return await _repo.GetList(pagesParams);
        }
    }
}