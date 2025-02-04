using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace WordQuizGame.Server;

[DependsOn(typeof(AbpAutofacModule))]
public class ServerModule : AbpModule
{
}