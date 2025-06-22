declare namespace App.Http.Resources.Post {
export type PostResource = {
id: number;
title: string;
slug: string;
post_content: string;
author: string;
categories: Array<any> | null;
created_at: string;
updated_at: string;
deleted_at: string | null;
};
}
declare namespace App.Http.Resources.User {
export type UserResource = {
id: number | null;
name: string | null;
email: string | null;
roles: Array<string> | null;
avatar: string | null;
created_at: string | null;
updated_at: string | null;
permissions: Array<string> | null;
};
}
