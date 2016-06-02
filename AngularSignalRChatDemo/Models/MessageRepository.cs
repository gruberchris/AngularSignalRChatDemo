using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularSignalRChatDemo.Models
{
  public interface IMessageRepository
  {
    IEnumerable<InstantMessage> GetMessages();

    void SaveMessage(InstantMessage message);
  }
  public class MessageRepository : IMessageRepository
  {
    List<InstantMessage> _messagesList;

    public MessageRepository()
    {
      _messagesList = new List<InstantMessage>();
    }

    public IEnumerable<InstantMessage> GetMessages()
    {
      return _messagesList.AsEnumerable();
    }

    public void SaveMessage(InstantMessage message)
    {
      _messagesList.Add(message);
    }
  }

  public class InstantMessage
  {
    public string MessageText { get; set; }

    public DateTime CreateDateTime { get; set; }

    public int MessageId { get; set; }
  }
}
