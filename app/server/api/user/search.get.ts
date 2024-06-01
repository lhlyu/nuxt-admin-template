import Mock from 'mockjs'

interface SearchUserRequest {
    current: number
    page_size: number
    name: string
    gender: number
    // ['东北', '华北', '华东', '华中', '华南', '西南', '西北']
    region: string
    birthday_start: number
    birthday_end: number
    state: number
}

interface UserData {
    id: number
    name: string
    gender: number
    region: string
    birthday: number
    state: number
}

interface SearchUserResponse {
    code: number
    msg: string
    data: {
        page: {
            total: number
            page_size: number
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
        region: Mock.Random.region(),
        birthday: +new Date(Mock.Random.date()),
        state: Mock.Random.natural(1, 3),
    })
}

export default defineEventHandler<SearchUserResponse>((event) => {
    const query = getQuery<SearchUserRequest>(event)

    Object.assign(query, {
        current: 1,
        page_size: 20,
        name: '',
        gender: 0,
        region: '',
        birthday_start: 0,
        birthday_end: 0,
        state: 0,
    })

    const newUsers = users.filter((v) => {
        if (!v.name.includes(query.name)) {
            return false
        }
        if (query.gender > 0 && v.gender !== query.gender) {
            return false
        }
        if (query.region.length && v.region !== query.region) {
            return false
        }
        if (query.birthday_end > 0 && v.birthday > query.birthday_end) {
            return false
        }
        if (query.birthday_start > 0 && v.birthday < query.birthday_start) {
            return false
        }
        if (query.state > 0 && v.state !== query.state) {
            return false
        }
        return true
    })

    const start = (query.current - 1) * query.page_size
    const end = query.current * query.page_size

    const list = newUsers.slice(start, end)
    const total = newUsers.length

    return {
        code: 0,
        msg: 'ok',
        data: {
            page: {
                current: query.current,
                page_size: query.page_size,
                total: total,
            },
            list: list,
        },
    }
})
