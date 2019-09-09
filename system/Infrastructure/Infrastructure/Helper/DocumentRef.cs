using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Helper
{
    public class DocumentRef
    {
        public DocumentRef(string collectionName, string id)
        {
            this.CollectionName = collectionName;
            this.DocumentId = id;
        }

        public string CollectionName { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string DocumentId { get; set; }
    }
}
