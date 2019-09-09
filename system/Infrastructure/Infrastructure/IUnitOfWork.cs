using Infrastructure.Repository.Template;
using MongoDB.Driver;

namespace Infrastructure
{
    public interface IUnitOfWork
    {
        IMongoClient Client { get; }
        IMongoDatabase Database { get; }

        ITemplateRepository TemplateRepository { get; }

        string TemplateCollectionName { get; }
    }
}
