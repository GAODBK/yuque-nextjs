// src/app/api/outline/generate/route.ts
import {NextRequest, NextResponse} from "next/server";
// @ts-ignore
import {JSDOM} from "jsdom";

export const POST = async (res: NextRequest) => {
    const body = await res.json()
    console.log(body.richText)
    let richText = body.richText

    const dom = new JSDOM(richText);
    const document = dom.window.document;
//     // const parser = new DOMParser();
//     // const document = parser.parseFromString(richText, 'text/html');
//
//     // 创建一个隐藏的div元素
//     // var div = document.createElement('div');
//     // var div = window.document.createElement('div');
    let div = document.createElement('div');
    div.style.display = 'none';
//     // 将富文本内容插入到div中
    div.innerHTML = richText;
//
    const titleTag = ["H1", "H2", "H3", "H4"];
    // @ts-ignore
    let titles = [];
    // @ts-ignore
    div.childNodes.forEach((e, index) => {
        if (titleTag.includes(e.nodeName)) {
            const id = "header-" + index;
            // @ts-ignore
            e.setAttribute("id", id);
            titles.push({
                id: id,
                // @ts-ignore
                title: e.innerHTML,
                level: Number(e.nodeName.substring(1, 2)),
                nodeName: e.nodeName
            });
        }
    });
//     // console.log(div.innerHTML)
    // @ts-ignore
    const catalog = titles;
//     // console.log(catalog);
//
//     // 原生JavaScript遍历
    // for (index in catalog) {
    const catalogStr = catalog.map((_, index) => {
        // document.getElementById('cataLog').innerHTML
        return "<li style='padding-left: "
            + (catalog[index].level * 22 - 22)
            + "px;'>"
            + "<a href='#"
            + catalog[index].id
            + "'>"
            + catalog[index].title + "</a>"
            + "</li>"
    }).join('')

    return NextResponse.json({
        full: `${catalogStr}<br/>${div.innerHTML}`,
        outline: catalogStr,
        rich: div.innerHTML,
    })
}