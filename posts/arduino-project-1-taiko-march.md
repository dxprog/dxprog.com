---
title: "Arduino Project #1 - Taiko March"
slug: arduino-project-1-taiko-march
date: 2012-08-11T01:44:53-05:00
tags:
- arduino
- code
- game
---
I've been wanting an Arduino microcontroller for some time and last week I finally broke down and bought one. I've been dicking around with some simple projects, but on of the things that I've been eagerly looking forward to doing is a computer controlled Christmas lights setup. There are some selfish reasons, I'll admit, like winning the company Christmas decorations contest. But, I digress.

To that end, I horked some code from a Taiko no Tatsujin clone I'd been writing a few years ago and tossed the output at the Arduino via serial data. Here's the result:

[![youtube video](https://img.youtube.com/vi/NNB-FKYbRWY]

Code is after the break![break]

The sketch for this is stupid simple: take the number from serial, make that pin high. Wait a bit, turn it off. Rinse and repeat.

[code=arduino/0.jpg)](https://www.youtube.com/watch?v=NNB-FKYbRWY]

Code is after the break![break]

The sketch for this is stupid simple: take the number from serial, make that pin high. Wait a bit, turn it off. Rinse and repeat.

[code=arduino)
int rxPin = 0;

void setup() {
  Serial.begin(9600); 
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    rxPin = Serial.read();
    digitalWrite(rxPin + 8, HIGH);
    delay(10);
    digitalWrite(rxPin + 8, LOW);
  }
}
[/code]

All the magic happens in the C# application that funnels the data down to the Arduino. It reads the beatmap (a custom XML format with data scraped from an osu! beatmap) and times the whole thing out.

[code=c#]

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO.Ports;
using System.Xml;
using System.Media;

using WMPLib;

namespace ArduinoTalk
{
	class Program
	{

		private class Note
		{
			public int x, type, accuracy;
			public bool active, deployed, hasBeenClosest, closest;
			public long delay;
		}

		// Constants
		private const int EASY = 0;
		private const int NORMAL = 1;
		private const int HARD = 2;
		private const int ONI = 3;
		private const int DON = 0;
		private const int KA = 1;

		private static List<Note> notes = new List<Note>();
		private static string songTitle, songFile;
		private static int bpm, noteSpeed, noteOffset, frameRate, currentNote;
		private static string[] maps = new string[4];
		private static WindowsMediaPlayer player = new WindowsMediaPlayer();
		private static int lastNote = 0;
		private static int prevNote = 0;
		private static int noteRun = 0;

		static void Main(string[] args)
		{

			SerialPort port = new SerialPort("COM5");
			port.Open();
			if (port.IsOpen)
			{
				loadSong("taiko_march");
				port.BaudRate = 9600;
				beginSong(HARD);

				System.Threading.Thread.Sleep(100);

				while (player.controls.currentPosition < player.currentMedia.duration)
				{
					double positionMilli = Math.Round(player.controls.currentPosition * 1000);
					if (lastNote < notes.Count && notes[lastNote].delay - positionMilli <= 0)
					{
						noteRun = prevNote == notes[lastNote].type ? noteRun + 1 : 0;
						int type = notes[lastNote].type * 2;
						type = prevNote == notes[lastNote].type ? type + noteRun % 2 : type;
						byte[] data = new byte[] { Convert.ToByte(type) };
						port.Write(data, 0, 1);
						Console.WriteLine("{0}, {1}, {2}", notes[lastNote].type, type, noteRun);
						prevNote = notes[lastNote].type;
						lastNote++;
					}
				}
				

			}
		}

		private static void loadSong(string patternFile)
		{

			XmlDocument xmlDoc = new XmlDocument();

			// Load and parse the song file
			xmlDoc.Load("maps/" + patternFile + ".xml");
			foreach (XmlNode node in xmlDoc.FirstChild)
			{
				switch (node.Name)
				{
					case "title":
						songTitle = node.FirstChild.Value;
						break;
					case "bpm":
						bpm = Convert.ToInt32(node.FirstChild.Value);
						break;
					case "file":
						songFile = node.FirstChild.Value;
						break;
					case "maps":
						foreach (XmlNode xmlMap in node.ChildNodes)
						{
							switch (xmlMap.Name)
							{
								case "easy":
									maps[EASY] = xmlMap.FirstChild.Value;
									break;
								case "normal":
									maps[NORMAL] = xmlMap.FirstChild.Value;
									break;
								case "hard":
									maps[HARD] = xmlMap.FirstChild.Value;
									break;
								case "oni":
									maps[ONI] = xmlMap.FirstChild.Value;
									break;
							}
						}
						break;
				}
			}

		}

		public static void beginSong(int difficulty)
		{

			// Load the map
			string[] map = maps[difficulty].Split(',');
			notes.Clear();
			foreach (string note in map)
			{
				Note t = new Note();
				string type = note.Substring(0, 1);
				t.delay = Convert.ToInt32(note.Substring(1, note.Length - 1));
				switch (type)
				{
					case "d":
						t.type = DON;
						break;
					case "k":
						t.type = KA;
						break;
				}
				t.x = 852;
				notes.Add(t);
			}
			currentNote = 0;
			notes.Sort((x, y) => x.delay.CompareTo(y.delay));

			// Play the song and note the start time
			player.URL = "C:\\Users\\Matt\\Documents\\Visual~1\\Projects\\ArduinoTalk\\ArduinoTalk\\bin\\Debug\\maps\\" + songFile;
			player.controls.play();

		}

	}

}
[/code]
