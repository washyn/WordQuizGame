using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace WordQuizGame.Server;

[DependsOn(typeof(AbpAutofacModule))]
public class ServerModule : AbpModule
{
    override public void ConfigureServices(ServiceConfigurationContext context)
    {
        // Add services to the container.

        context.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        context.Services.AddEndpointsApiExplorer();
        context.Services.AddSwaggerGen();
    }
}