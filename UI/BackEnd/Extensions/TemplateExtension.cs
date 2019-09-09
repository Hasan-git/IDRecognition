using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;
using Infrastructure.Domain;
using Google.Cloud.Vision.V1;
using Image = SixLabors.ImageSharp.Image;
using System.IO;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Advanced;
using SixLabors.ImageSharp.Formats.Jpeg;
using System.Text.RegularExpressions;
using BackEnd.Models;

namespace BackEnd.Extensions
{
    public static class TemplateExtension
    {

        public static List<OCRResult> RecogizeAreas(IFormFile file, Template template)
        {


            var client = ImageAnnotatorClient.Create();
            var ocrResult = new List<OCRResult>();

            using (Image image = Image.Load(file.OpenReadStream()))
            {
                // @ Resize
                image.Mutate(x => x.Resize(template.Width, template.Height));

                // @ Crop
                template.Snippets.ForEach(snippet =>
                {
                    var dimensions = snippet.Dimensions;
                    var cropped = image.Clone(c => c.Crop(new Rectangle(dimensions.X, dimensions.Y, dimensions.Width, dimensions.Height)));

                    var bytes = ImageToBytes(cropped);
                    var img = Google.Cloud.Vision.V1.Image.FromBytes(bytes);
                    var response = client.DetectDocumentText(img);

                    if (response == null)
                        throw new InvalidOperationException("OCR process failed.");

                    var value = string.IsNullOrEmpty(response.Text) ? String.Empty : response.Text.Replace("\n", String.Empty);

                    ocrResult.Add(new OCRResult() { Metadata = snippet.Metadata, value = value });

                });

                return ocrResult;
            }
        }

        public static byte[] ImageToBytes(Image image)
        {
            using (var memoryStream = new MemoryStream())
            {
                var imageEncoder = image.GetConfiguration().ImageFormatsManager.FindEncoder(JpegFormat.Instance);
                image.Save(memoryStream, imageEncoder);
                var imageBytes = memoryStream.ToArray();

                return imageBytes;
            }
        }
    }
}
