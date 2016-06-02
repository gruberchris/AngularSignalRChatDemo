using AngularSignalRChatDemo.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace AngularSignalRChatDemo.Controllers
{
  public class MessagesController : ApiController
  {
    IMessageRepository _messageRepository;

    public MessagesController(IMessageRepository messageRepository)
    {
      _messageRepository = messageRepository;
    }

    public IEnumerable<InstantMessage> Get()
    {
      return _messageRepository.GetMessages();
    }

    public void Post([FromBody]InstantMessage message)
    {
      _messageRepository.SaveMessage(message);
    }
  }
}
