using AngularSignalRChatDemo.Models;
using LightInject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace AngularSignalRChatDemo
{
  public static class DependencyConfig
  {
    public static void Register(HttpConfiguration configuration)
    {
      var container = new ServiceContainer();
      container.RegisterApiControllers();
      container.Register<IMessageRepository, MessageRepository>(new PerContainerLifetime());
      container.EnableWebApi(configuration);
    }
  }
}
