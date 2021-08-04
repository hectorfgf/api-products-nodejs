import { Get, Route } from "tsoa";

interface HalthResponse {
    message: string;
}

@Route("health")
export default class HealthController {

    @Get("/")
    public async getMessage(): Promise<HalthResponse> {
        return {
            message: "API is working!",
        };
    }
}
