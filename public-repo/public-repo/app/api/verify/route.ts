import { attendees } from "@/data/attendees";

const normalizeText = (value: string) => value.trim();

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      submitter?: string;
      keyword?: string;
    };
    const name = body.name?.trim();
    const submitter = body.submitter?.trim();
    const keyword = body.keyword?.trim();

    if (name && submitter) {
      const target = attendees.find(
        (attendee) =>
          normalizeText(attendee.name) === normalizeText(name) &&
          normalizeText(attendee.submitter) === normalizeText(submitter)
      );

      if (!target) {
        return Response.json(
          { ok: false, message: "未找到匹配的记录，请确认提交人与填写姓名" },
          { status: 404 }
        );
      }

      return Response.json({ ok: true, attendee: target });
    }

    const lookup = keyword || name || submitter;

    if (!lookup) {
      return Response.json(
        { ok: false, message: "请提供姓名或报名提交人" },
        { status: 400 }
      );
    }

    const normalizedLookup = normalizeText(lookup);
    const matches = attendees.filter(
      (attendee) =>
        normalizeText(attendee.name) === normalizedLookup ||
        normalizeText(attendee.submitter) === normalizedLookup
    );

    if (matches.length === 0) {
      return Response.json(
        { ok: false, message: "未找到匹配的记录，请确认填写姓名或提交人" },
        { status: 404 }
      );
    }

    if (matches.length > 1) {
      return Response.json(
        { ok: false, message: "匹配到多条记录，请使用填写姓名进行查询" },
        { status: 409 }
      );
    }

    const target = matches[0];

    if (!target) {
      return Response.json(
        { ok: false, message: "未找到匹配的记录，请确认填写姓名或提交人" },
        { status: 404 }
      );
    }

    return Response.json({ ok: true, attendee: target });
  } catch {
    return Response.json(
      { ok: false, message: "请求格式错误" },
      { status: 400 }
    );
  }
}
