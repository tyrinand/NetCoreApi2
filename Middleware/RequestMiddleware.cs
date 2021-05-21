using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Controllers;
using Api_work;

namespace NetCoreApi2
{
    public class RequestLoggerMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLoggerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
        
          var controllerActionDescriptor = httpContext.GetEndpoint()?.Metadata.GetMetadata<ControllerActionDescriptor>();
        
           var Host = httpContext.Request.Host;
           var QueryString = httpContext.Request.QueryString;
           var Method = httpContext.Request.Method;
           var ControllerName = "";
           var ActionName  = "";
           var RemoteIpAddress = httpContext.Connection.RemoteIpAddress;
           var Body = await ReadBodyFromRequest(httpContext.Request);

            if(controllerActionDescriptor != null)
            {
                ControllerName = controllerActionDescriptor.ControllerName;
                ActionName  = controllerActionDescriptor.ActionName;
            }

            var message = $"Host :{Host}, QueryString : {QueryString}, Method : {Method}, ControllerName : {ControllerName}, ActionName : {ActionName}, RemoteIpAddress : {RemoteIpAddress}, Body : {Body}";
            CreateBDFulling.WriteLog("Info", message);

            await _next(httpContext);
        }


        private static async Task<string> ReadBodyFromRequest(HttpRequest request)
        {
            request.EnableBuffering();
            var requestBody = "";

            using(var streamReader = new StreamReader(request.Body, leaveOpen : true))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }

            request.Body.Position = 0;
            return requestBody;
        }
    }
}