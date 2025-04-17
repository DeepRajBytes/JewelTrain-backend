import fs from "fs";
import { google } from "googleapis";
import { Readable } from "stream";

const apikeys = {
  type: "service_account",
  project_id: "jeweltrainresumestorage",
  private_key_id: "368319b486351662066c7dee537c64757367869c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC22JMMW4SpAhWt\nuBP0nwXJtic6wIpNjv8QCFPrTA895zTDS8eIpy3UfYXcU+ega0I55tGxWIpDfvyT\nUTGD0aY39OD4WkcpAFaE4Eqm+9sbmsw6DBzFRHlo2nUA5ZX5TOT2paoz1aPvTdsi\nv1tw9EKBwn1myOzwR6yr9MNqsj9rdBlE/qRyYl5J893e8gxKM7gP3LNtxOYCMdyC\n2G4ZWBzJ7aLuQc+t2xSjXjqyU87Hp1HsllUJMdJEAJUohGw8xrk/1e7t8boqOJCI\nNrphaWTh91zK2kyxdZnjbzj0/+NZqVQWGsep3yJx3jIoeshzf+m/V1slk5JcJ38+\nOPuZ8xDXAgMBAAECggEACvwMKtK4BQlAMSgHtuCeJzs/XxW1w/63ubMDtkqNozE9\nJ7sT49SbTxKIFK+hENpGEmwYo+Kxp71nbMLqH8UGtdeLHmXEtE9guJSFl5jg1byL\n0V7slDikDJW3MBRwLpfH15N7Rqg/3tQFZVsr91INSXYG35e+4u6DY+836t8w1S0m\n6oQkl66T3G1jvjiVhQy8TaFz/lhM9lg1oG8lA3kPuPI+YeUZbR7EZ+LueIvpCcWt\nRQriztt5VyM+IkMZQxchHhZALWwEbBIZ/DLyvy6xKM616iXgGTVWjATRp4UCIETl\n0ZUs3bURvEZQTg8wR8eg2XoNzD74Yq8iGoHEAuyWGQKBgQD7UQC9wRYR9M8wZDid\n9VfnUF1Uh4NL2E9lWQV8iYANYG4SbWa0EdrVtNvvGa2tKWNY6lbT92vdoAacrCjq\nm+/JsWI4gbJAvjPJP3TiE1rYrPqE2AxWy0ZN8l1d7Tn9EbUA7n5Z+6luzFT9uKjv\nSrP+pGkLjmZ4CHRr3V1+OpJQCQKBgQC6QOiDTA89hKsetPkakH0DUlpzwH4CPhhZ\nMKT6FTg5lrvUKO/1dccJQeNF609HZ8vPenZkVfki4pjzsg+SFovSk0s4N0lFKSSE\nHoe4J3h6ULeG86ye/h3jBzUYxJAYgLz5nx7octEjmhbIoPcox7Qy51T2OIft3SzX\nj3bsEejR3wKBgQCEBZ2aEWECtdRR25RShpxTC8i7qySyJ0QuPYHAVotKe6nXTFlz\npx2KvqP7C0ZNfTyPbSuH1qZ3mqVekKI9/QUOs3yhqqB1mnWh9w/z468JvHUubECv\nJ8IbGIMr4H9iDndDsgX2R1pOtlC/qM42RswfrUbxpzD1RZvDPlrrAOHz4QKBgCA9\n9kIsW4MJwVmqeGjp1EpL6k6ZZvbaavqdmiGUpMwLVO6QO6HhRphKqJ5E8s9on3aG\nO5J484zfbxzYmStv7bqBNwc/QtbPHXwlkNcHNiruaCbbbemEEgZoDAACnvMu7gfE\nTORuY9fm58TJYJ/VmlMpiqKo/Jbnr8iNFEgffY8/AoGAUJksIuR8SFgtv6Ugr+SS\nQGu8uYqghivP8+8XtkFmAQfY5ZjhzE4IL5DW1zPtL7iWEnKGqAhmDu+rbGcVunCr\nURKWQrxbmo4gfbiukQEEFtFOxHwgIfwnsg+lz2KEqU7LGf17aBFqpVwscZAJY2tg\nQW1dygQ/fUeJ+3QRe38AA74=\n-----END PRIVATE KEY-----\n",
  client_email:
    "jeweltrainresume@jeweltrainresumestorage.iam.gserviceaccount.com",
  client_id: "100086447794121706008",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/jeweltrainresume%40jeweltrainresumestorage.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};


const SCOPE = ["https://www.googleapis.com/auth/drive"];

class DriveUploadMEthods {
  public async authorize() {
    const jwtclient = new google.auth.JWT(
      apikeys.client_email,
      undefined,
      apikeys.private_key,
      SCOPE
    );
    await jwtclient.authorize();
    // console.log("jwtclient", jwtclient);
    return jwtclient;
  }

  public async uploadFIle(authClient: any, file: any, newFileName: string) {
    // console.log("yha tak bat aayi", authClient);
    return new Promise((resolve, rejected) => {
      const drive = google.drive({ version: "v3", auth: authClient });

      var FilemetaData = {
        name: newFileName,
        parents: ["1Pr7WQTo0t6_7ZYsGoBn085cDO3zlUZTr"],
      };

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      drive.files.create(
        {
          requestBody: FilemetaData,
          media: {
            body: bufferStream,
            mimeType: file.mimetype,
          },
          fields: "id, webViewLink",
        },
        (err: any, file: any) => {
          if (err) {
            console.log("err upload", err);
            return rejected(err);
          }
          resolve(file);
        }
      );
    });
  }
}


export default DriveUploadMEthods;