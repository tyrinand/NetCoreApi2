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

        [HttpGet]
        [Route("/api/[controller]/GetSale/{id?}")]
        public async Task<SaleForm> GetSale(int? id = null)
        {
            return await _repo.GetSale(id);
        }

        [HttpPost]
        public async Task<bool> CreateSale(Sale sale)
        {
            return await _repo.Create(sale);
        }

        [HttpDelete("{id}")]
        public async Task<bool> DeleteSale(int id)
        {
            return await _repo.Delete(id);
        }

        [HttpPut]
        public async Task<bool> Update(Sale sale)
        {
            return await _repo.Update(sale);
        }
    }
}