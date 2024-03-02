// 파일 경로: /routes/apiRoutes.ts
import { Router } from "express";
import { mariaControllers } from "../../mariadb";

const router = Router();

router.get("/talks/:talkId/user/:userId", async (req, res) => {
  const { talkId, userId } = req.params;
  try {
    const title = await mariaControllers.fetchTalkDataByIdAndUserId(
      talkId,
      userId
    );
    res.json({ success: true, title });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

export default router;
