using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Api_work.Service.Repository;
using NetCoreApi2;

namespace Api_work
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen();

            var connect = Configuration["ConnectionStrings:SaleDatabase"];
            var connectLog = Configuration["ConnectionStrings:LogDatabase"];

            services.AddTransient<IClientRepository, ClientRepository>(provider => new ClientRepository(connect));
            services.AddTransient<ISoftRepository, SoftRepository>(provider => new SoftRepository(connect));
            services.AddTransient<ISaleRepository, SaleRepository>(provider => new SaleRepository(connect));
            services.AddTransient<ILogRepository, LogRepository>(provider => new LogRepository(connectLog));

            services.AddControllersWithViews();

            

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler("/error-local-development");
            app.UseStaticFiles();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseRequestResponseLogging();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "clientapp";
   
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

           
            
        }
    }
}
