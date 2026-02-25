import {
  Canvas,
  Group,
  Path,
  Skia,
  Image as SkImage,
  useImage,
} from "@shopify/react-native-skia";
import React, { useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import raw from "../../sectores.json";

/* ───────────── TYPES ───────────── */

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type SectionGeometry = {
  id: string;
  d: string;
  box: BoundingBox;
};

type StadiumGeometry = {
  stadium: { viewBox: string };
  sections: SectionGeometry[];
};

const data = raw as StadiumGeometry;

const SVG_W = 2816;
const SVG_H = 2641;

/* ───────────── CONFIG ───────────── */

const STADIUM_HEIGHT = 200;
const LUPA_SIZE = 50;

const ZOOM_SIZE = 250;
const ZOOM_SCALE = 0.3;
const ZOOM_RADIUS = 200;

/* ───────────── HELPERS ───────────── */

function localToSvgPoint(
  x: number,
  y: number,
  viewW: number,
  viewH: number
) {
  const svgRatio = SVG_W / SVG_H;
  const viewRatio = viewW / viewH;

  let scale = 1;
  let offX = 0;
  let offY = 0;

  if (viewRatio > svgRatio) {
    scale = viewH / SVG_H;
    offX = (viewW - SVG_W * scale) / 2;
  } else {
    scale = viewW / SVG_W;
    offY = (viewH - SVG_H * scale) / 2;
  }

  const sx = (x - offX) / scale;
  const sy = (y - offY) / scale;

  if (sx < 0 || sy < 0 || sx > SVG_W || sy > SVG_H) return null;
  return { x: sx, y: sy };
}

function boxNearFocus(box: BoundingBox, fx: number, fy: number) {
  return (
    fx >= box.x - ZOOM_RADIUS &&
    fx <= box.x + box.width + ZOOM_RADIUS &&
    fy >= box.y - ZOOM_RADIUS &&
    fy <= box.y + box.height + ZOOM_RADIUS
  );
}

/* ───────────── COMPONENT ───────────── */

export default function StadiumScreen() {
  const [stadiumSize, setStadiumSize] = useState({ w: 0, h: 0 });
  const [lupaPos, setLupaPos] = useState({ x: 40, y: 40 });
  const [focus, setFocus] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<SectionGeometry | null>(null);

  const stadiumImage = useImage(require("../../Group106.png"));

  /* Parsear paths UNA sola vez */
  const paths = useMemo(() => {
    return data.sections
      .map((s) => {
        const p = Skia.Path.MakeFromSVGString(s.d);
        if (!p) return null;
        return { path: p, raw: s };
      })
      .filter(Boolean) as { path: any; raw: SectionGeometry }[];
  }, []);

  const visiblePaths = useMemo(() => {
    if (!focus) return [];
    return paths.filter((p) =>
      boxNearFocus(p.raw.box, focus.x, focus.y)
    );
  }, [focus, paths]);

  const moveLupa = useCallback(
    (evt: any) => {
      const { locationX, locationY } = evt.nativeEvent;

      const nx = Math.min(
        Math.max(locationX - LUPA_SIZE / 2, 0),
        stadiumSize.w - LUPA_SIZE
      );
      const ny = Math.min(
        Math.max(locationY - LUPA_SIZE / 2, 0),
        stadiumSize.h - LUPA_SIZE
      );

      setLupaPos({ x: nx, y: ny });

      const centerX = nx + LUPA_SIZE / 2;
      const centerY = ny + LUPA_SIZE / 2;

      const p = localToSvgPoint(centerX, centerY, stadiumSize.w, stadiumSize.h);
      if (p) setFocus(p);
    },
    [stadiumSize]
  );

  const handleZoomTap = useCallback(
    (evt: any) => {
      if (!focus) return;

      const { locationX, locationY } = evt.nativeEvent;

      const sx =
        focus.x + (locationX - ZOOM_SIZE / 2) / ZOOM_SCALE;
      const sy =
        focus.y + (locationY - ZOOM_SIZE / 2) / ZOOM_SCALE;

      for (const p of visiblePaths) {
        if (p.path.contains(sx, sy)) {
          setSelected(p.raw);
          return;
        }
      }

      setSelected(null);
    },
    [focus, visiblePaths]
  );

  return (
    <View style={styles.container}>
      {/* ───────── ESTADIO ARRIBA ───────── */}
      <View
        style={styles.stadium}
        onLayout={(e) =>
          setStadiumSize({
            w: e.nativeEvent.layout.width,
            h: e.nativeEvent.layout.height,
          })
        }
        onStartShouldSetResponder={() => true}
        onResponderMove={moveLupa}
        onResponderGrant={moveLupa}
      >
        <Image
          source={require("../../Group106.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View
          pointerEvents="none"
          style={[
            styles.lupa,
            { left: lupaPos.x, top: lupaPos.y },
          ]}
        />
      </View>

      {/* ───────── ZOOM (SKIA REAL) ───────── */}
      <View style={styles.zoomWrap}>
        <Canvas
          style={styles.zoom}
          onTouchEnd={handleZoomTap}
        >
          {focus && stadiumImage && (
            <Group
              transform={[
                {
                  translateX:
                    ZOOM_SIZE / 2 - focus.x * ZOOM_SCALE,
                },
                {
                  translateY:
                    ZOOM_SIZE / 2 - focus.y * ZOOM_SCALE,
                },
                { scale: ZOOM_SCALE },
              ]}
            >
              <SkImage
                image={stadiumImage}
                x={0}
                y={0}
                width={SVG_W}
                height={SVG_H}
              />

              {visiblePaths.map((p) => (
                <Path
                  key={p.raw.id}
                  path={p.path}
                  color={
                    selected?.id === p.raw.id
                      ? "rgba(0,200,0,0.8)"
                      : "rgba(255,215,100,0.5)"
                  }
                />
              ))}
            </Group>
          )}
        </Canvas>
      </View>

      <Text style={styles.info}>
        {selected ? `Seleccionado: ${selected.id}` : "Seleccioná desde el zoom"}
      </Text>
    </View>
  );
}

/* ───────────── STYLES ───────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 12,
  },
  stadium: {
    height: STADIUM_HEIGHT,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  lupa: {
    position: "absolute",
    width: LUPA_SIZE,
    height: LUPA_SIZE,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  zoomWrap: {
    marginTop: 20,
    alignItems: "center",
  },
  zoom: {
    width: ZOOM_SIZE,
    height: ZOOM_SIZE,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  info: {
    color: "#fff",
    textAlign: "center",
    marginTop: 12,
  },
});
