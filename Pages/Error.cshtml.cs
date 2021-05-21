using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Diagnostics;

namespace Api_work.Pages
{
    [ApiController]
public class ErrorController : ControllerBase
{
    [HttpGet]
    [Route("/error-local-development")]
    public IActionResult ErrorLocalDevelopment([FromServices] IWebHostEnvironment webHostEnvironment)
    {

        var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
        var error = context.Error;

        CreateBDFulling.WriteLog("Error", error.Message, error.StackTrace);

        return Problem(
            detail: error.StackTrace,
            title: error.Message);
    }
}
}
