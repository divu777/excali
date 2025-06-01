import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

const drawExistingshapes = (
  shapesArray: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  if (shapesArray.length == 0) {
    return;
  }

  shapesArray.map((shapes) => {
    if (shapes.type == "rect") {
      ctx.strokeRect(shapes.x, shapes.y, shapes.width, shapes.height);
    }
  });
};

const getOldShapes = async (roomId: string) => {
  const result = await axios.get(
    `http:localhost:3000/api/v1/room/chats/${roomId}`
  );

  const messages = result.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageJson = JSON.parse(x.message);
    return messageJson;
  });

  return shapes;
};

export async function drawing(canvas: HTMLCanvasElement, roomId: string) {
  const ShapesState: Shape[] = []
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;

  if (!ctx) {
    return;
  }
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawExistingshapes(ShapesState, ctx, canvas);

  let moving = false;
  let StartX = 0;
  let StartY = 0;

  canvas.addEventListener("mousedown", (e) => {
    moving = true;
    StartX = e.clientX;
    StartY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    moving = false;

    ShapesState.push({
      type: "rect",
      x: StartX,
      y: StartY,
      width: e.clientX - StartX,
      height: e.clientY - StartY,
    });
  });

  canvas.addEventListener("mousemove", (e) => {
    if (moving) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";

      drawExistingshapes(ShapesState, ctx, canvas);

      ctx.strokeRect(StartX, StartY, e.clientX - StartX, e.clientY - StartY);
    }
  });

  return () => {
    canvas.removeEventListener("mousedown", () => {});
    canvas.removeEventListener("mouseup", () => {});
    canvas.removeEventListener("mousemove", () => {});
  };
}
