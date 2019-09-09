using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Domain
{
    public class Snippet
    {
        public Snippet()
        {
            Dimensions = new Dimensions();
        }

        public string Metadata { get; set; }
        public Dimensions Dimensions { get; set; }

    }
}
