import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto("https://example.com");
  const pageTitle = await page.title();
  await browser.close();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: pageTitle,
        input: event,
      },
      null,
      2
    ),
  };
};
