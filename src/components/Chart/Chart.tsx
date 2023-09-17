import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";

import highchartsAccessibility from "highcharts/modules/accessibility";
// @ts-expect-error https://github.com/highcharts/highcharts/issues/19103
import highchartsMouse from "highcharts/modules/mouse-wheel-zoom";
import { useGlobal } from "../../hooks/useGlobal";
import theme from "../../theme";
import { parseChunk } from "../../utils/parseChunk";
import { CHUNK_SIZE } from "../../utils/constants";

// init the modules
highchartsMouse(Highcharts);
highchartsAccessibility(Highcharts);

const reader = new FileReader();

export const Chart: React.FC = () => {
  const { file, chunk } = useGlobal();
  const [options, setOptions] = useState<Highcharts.Options>({
    chart: {
      panning: { enabled: true, type: "x" },
      backgroundColor: theme.palette.background.default,
      panKey: "shift",
      zooming: {
        mouseWheel: true,
        type: "xy",
      },
    },
    xAxis: {
      title: {
        text: "Time (s)",
      },
    },
    title: {
      text: "",
    },
    yAxis: {},
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (!file) {
      return;
    }

    reader.onload = () => {
      const result = reader.result as string;
      setOptions({
        series: parseChunk(result),
      });
    };

    const slice = file.slice(
      CHUNK_SIZE * (chunk - 1),
      CHUNK_SIZE * (chunk - 1) + CHUNK_SIZE
    );
    if (reader.readyState !== FileReader.LOADING) {
      reader.readAsText(slice);
    }
  }, [file, chunk]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
