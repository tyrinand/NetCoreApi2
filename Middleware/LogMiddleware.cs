using Microsoft.AspNetCore.Builder;

namespace NetCoreApi2
{
    public static class LogMiddleware
    {
        public static void UseRequestResponseLogging(this IApplicationBuilder app) => app.UseMiddleware<RequestLoggerMiddleware>();
    }
}