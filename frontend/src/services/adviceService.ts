type AdviceSlipResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

type TranslationResponse = {
  responseData: {
    translatedText: string;
  };
};

export async function getDailyPhrase() {
  const adviceResponse = await fetch("https://api.adviceslip.com/advice");
  const adviceData = (await adviceResponse.json()) as AdviceSlipResponse;

  const advice = adviceData.slip.advice;

  const translationUrl = new URL("https://api.mymemory.translated.net/get");
  translationUrl.searchParams.set("q", advice);
  translationUrl.searchParams.set("langpair", "en|pt-br");

  const translationResponse = await fetch(translationUrl);
  const translationData =
    (await translationResponse.json()) as TranslationResponse;

  return translationData.responseData.translatedText;
}