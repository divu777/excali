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
      x: number;
      y: number;
      radius: number;
      startAngle: number;
      endAngle: number;
    };


export class Game {
  private canvas: HTMLCanvasElement;
  private existingShapes: Shape[];
  private ctx: CanvasRenderingContext2D;
  private roomId: number;
  private socket: WebSocket;
  private moving: Boolean = false;
  private StartX = 0;
  private StartY = 0;
  private currShape: "circle" | "rect" | "line" = "line";

  constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    this.canvas = canvas;
    this.existingShapes = [];
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;
    const { width, height } = this.canvas.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;
    this.init();
    this.initMouseEvents();
  }

  async init() {
    this.existingShapes = await getOldShapes(String(this.roomId));
    this.drawExistingshapes();
    this.initSockets();
  }

  changeShape(shape:"rect"|"circle"|"line"){
    this.currShape=shape
    console.log(this.currShape + "curr shape ")
  }

  initSockets() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log(" messs rec" + event.data + message);

      if (message.type == "chat") {
        this.existingShapes.push(message.payload.chat);
        console.log(this.existingShapes);
        this.drawExistingshapes();
      }
    };
  }

  initMouseEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.moving = true;
      this.StartX = e.clientX;
      this.StartY = e.clientY;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.moving = false;

      if (this.currShape == "circle") {
        const x = Math.pow(e.clientX - this.StartX, 2);
        const y = Math.pow(e.clientY - this.StartY, 2);
        const distance = Math.sqrt(x + y);
        const shape: Shape = {
          type: "circle",
          x: (e.clientX + this.StartX) / 2,
          y: (e.clientY + this.StartY) / 2,
          radius: distance / 2,
          startAngle: 0,
          endAngle: 2 * Math.PI,
        };
        this.existingShapes.push(shape);

        this.socket.send(
          JSON.stringify({
            type: "chat",
            payload: {
              roomId: this.roomId,
              chat: shape,
            },
          })
        );
      }

     else if (this.currShape == "rect") {
        const shape: Shape = {
          type: "rect",
          x: this.StartX,
          y: this.StartY,
          width: e.clientX - this.StartX,
          height: e.clientY - this.StartY,
        };
        this.existingShapes.push(shape);

        this.socket.send(
          JSON.stringify({
            type: "chat",
            payload: {
              roomId: this.roomId,
              chat: shape,
            },
          })
        );
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.moving) {
        this.drawExistingshapes();
        if (this.currShape == "circle") {
          const x = Math.pow(e.clientX - this.StartX, 2);
          const y = Math.pow(e.clientY - this.StartY, 2);
          const distance = Math.sqrt(x + y);
          this.ctx.beginPath();
          this.ctx.arc(
            (e.clientX + this.StartX) / 2,
            (e.clientY + this.StartY) / 2,
            distance / 2,
            0,
            2 * Math.PI
          );
          this.ctx.stroke();
          this.ctx.closePath()
        }
        else if (this.currShape == "rect") {
          this.ctx.strokeRect(
            this.StartX,
            this.StartY,
            e.clientX - this.StartX,
            e.clientY - this.StartY
          );
        }
      }
    });
  }

  drawExistingshapes() {
    this.ctx.strokeStyle = "blue";
    this.ctx.lineWidth = 2;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


    this.existingShapes.forEach((shapes) => {
      if (shapes.type == "rect") {
        this.ctx.strokeRect(shapes.x, shapes.y, shapes.width, shapes.height);
      }
      if (shapes.type == "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shapes.x,
          shapes.y,
          shapes.radius,
          shapes.startAngle,
          shapes.endAngle
        );
        this.ctx.stroke();
      }
    });
  }


  removeEventHandlers(){
      this.canvas.removeEventListener("mousedown", () => {});
    this.canvas.removeEventListener("mouseup", () => {});
    this.canvas.removeEventListener("mousemove", () => {});
  }
}


const getOldShapes = async (roomId: string) => {
  const result = await axios.get(
    `http://localhost:8080/api/v1/room/chats/${roomId}`
  );

  console.log(result);
  const messages = result.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageJson = JSON.parse(x.message);
    return messageJson;
  });

  return shapes;
};