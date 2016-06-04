using AngularSignalRChatDemo.Hubs;
using AngularSignalRChatDemo.Models;
using Microsoft.AspNet.SignalR;
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

			var context = GlobalHost.ConnectionManager.GetHubContext<MessageHub>();
			context.Clients.All.addNewMessage(message);		// dynamic expression
		}
	}
}
