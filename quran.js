#!/usr/bin/env node

const axios = require("axios");

const fetchVerse = async (surahNumber, verseNumber) => {
	try {
		const responseEN = await axios.get(
			`http://api.alquran.cloud/v1/ayah/${surahNumber}:${verseNumber}/en.sahih`,
		);
		const responseID = await axios.get(
			`http://api.alquran.cloud/v1/ayah/${surahNumber}:${verseNumber}/id.indonesian`,
		);

		const dataEN = responseEN.data;
		const dataID = responseID.data;

		if (dataEN.status === "OK" && dataID.status === "OK") {
			const verseEN = dataEN.data;
			const verseID = dataID.data;

			console.log(
				`\nSurah ${verseEN.surah.englishName} (${verseEN.surah.englishNameTranslation}) Ayat ${verseEN.numberInSurah}`,
			);
			console.log(`\nEnglish:\n${verseEN.text}\n`);
			console.log(`Indonesian:\n${verseID.text}\n`);
		} else {
			console.log("Ayat not found. Please check the Surah and Ayat numbers.");
		}
	} catch (error) {
		console.error("Failed to fetch Ayat:", error.message);
	}
};

const [, , surahNumber, verseNumber] = process.argv;

if (surahNumber && verseNumber) {
	if (isNaN(surahNumber) || isNaN(verseNumber)) {
		console.log("Surah and Ayat numbers must be numeric.");
	} else {
		fetchVerse(surahNumber, verseNumber);
	}
} else {
	console.log("Please provide the Surah and Ayat numbers.");
	console.log("Usage: node quran.js <SurahNumber> <AyatNumber>");
	console.log("Example: node quran.js 1 1");
}
