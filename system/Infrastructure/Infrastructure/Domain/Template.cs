using Infrastructure.Helper;
using System;
using System.Collections.Generic;

namespace Infrastructure.Domain
{
    [CollectionName("Templates")]
    public class Template : Entity
    {
        public Template()
        {
            CreatedOn = DateTime.Now;
            Snippets = new List<Snippet>();
        }

        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public List<Snippet> Snippets { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime? Modified { get; set; }
    }
}
