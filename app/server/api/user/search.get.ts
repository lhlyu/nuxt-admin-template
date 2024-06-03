import Mock from 'mockjs'

interface SearchUserRequest {
    current: number
    size: number
    name: string
    gender: number
}

interface UserData {
    id: number
    name: string
    gender: number
}

interface SearchUserResponse {
    code: number
    msg: string
    data: {
        page: {
            total: number
            size: number
            current: number
        }
        list: UserData[]
    }
}

// mock
const users: UserData[] = []

for (let i = 0; i < 100; i++) {
    users.push({
        id: i + 1,
        name: Mock.Random.cname(),
        gender: Mock.Random.natural(1, 2),
    })
}

export default defineEventHandler<SearchUserResponse>((event) => {
    const q = getQuery<SearchUserRequest>(event)

    let query: SearchUserRequest = {
        current: Number(q.current ?? 1),
        size: Number(q.size ?? 10),
        name: q.name ?? '',
        gender: q.gender ?? 0,
    }

    const newUsers = users.filter((v) => {
        if (!v.name.includes(query.name)) {
            return false
        }
        if (query.gender > 0 && v.gender !== query.gender) {
            return false
        }
        return true
    })

    const start = (query.current - 1) * query.size
    const end = query.current * query.size

    const list = newUsers.slice(start, end)
    const total = newUsers.length

    return {
        code: 0,
        msg: 'ok',
        data: {
            page: {
                current: query.current,
                size: query.size,
                total: total,
            },
            list: list,
        },
    }
})
