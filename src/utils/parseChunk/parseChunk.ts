export const parseChunk = (chunk: string): Highcharts.SeriesOptionsType[] => {
  const series = [
    { data: [] as Array<[number, number]>, name: "Channel 1" },
    { data: [], name: "Channel 2" },
    { data: [], name: "Channel 3" },
    { data: [], name: "Channel 4" },
  ];

  chunk.split("\n").forEach((line, index, arr) => {
    if (index === 0 || index === arr.length - 1) {
      return;
    }
    const [time, first, second, third, fourth] = line.split(",").map(Number);

    if (first) {
      series[0].data.push([time, first]);
    }
    if (second) {
      series[1].data.push([time, second]);
    }
    if (third) {
      series[2].data.push([time, third]);
    }
    if (fourth) {
      series[3].data.push([time, fourth]);
    }
  });

  return series as Highcharts.SeriesOptionsType[];
};
