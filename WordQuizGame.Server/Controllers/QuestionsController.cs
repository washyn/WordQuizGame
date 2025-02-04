using Microsoft.AspNetCore.Mvc;
using Volo.Abp.DependencyInjection;

namespace WordQuizGame.Server.Controllers
{
    [ApiController]
    [Route("api/questions")]
    public class QuestionsController : ControllerBase
    {
        private readonly ILogger<QuestionsController> _logger;
        // private readonly SampleLog _sampleLog;

        public QuestionsController(ILogger<QuestionsController> logger
        // , SampleLog sampleLog
        )
        {
            _logger = logger;
            // _sampleLog = sampleLog;
        }

        [HttpGet()]
        public void Get()
        {
            _logger.LogInformation("Get questions");
            // _sampleLog.Get();
        }
    }

    // public class SampleLog : ITransientDependency
    // {
    //     private readonly ILogger<SampleLog> _logger;
    //     SampleLog(ILogger<SampleLog> logger)
    //     {
    //         _logger = logger;
    //         _logger = logger;
    //     }
    //     public void Get()
    //     {
    //         _logger.LogInformation("Get questions");
    //     }
    // }
}
