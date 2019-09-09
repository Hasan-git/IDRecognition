using Infrastructure;
using Infrastructure.Repository.Template;
using MongoDB.Driver;

namespace Medcilia.Clinic.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(string connectionString)
            : this(new MongoUrl(connectionString))
        {
        }

        public UnitOfWork(MongoUrl url)
        {
            Client = new MongoClient(url);
            Database = Client.GetDatabase(url.DatabaseName);
        }

        public IMongoClient Client { get; }

        public IMongoDatabase Database { get; }

        public ITemplateRepository TemplateRepository => new TemplateRepository(this);

        public string TemplateCollectionName
        {
            get => "Templates";

        }
    }
}
