![Local Image](src/assets/banner.png)

# LegalKnowledgeBot Frontend

## Introduction

The Legal Knowledge Bot is a powerful tool that provides a user-friendly interface that makes it easy for users to search for and ask questions about the law.

## Project Functions
1. Allow users to ask and answer questions about the legal field
2. Allow users to look up legal terms
3. Allow users use it to look at the dharma dictionary and filter out the terms contained in the dharma dictionary
4. Allow users filter terms from paragraphs
5. Provide a forum for users to ask and answer questions about the law
   
The Legal Knowledge Bot is a powerful tool that provides a user-friendly interface that makes it easy for users to search for and ask questions about the law.

## Technologies

-   React: JavaScript library for building user interfaces
-   Tailwind CSS: Utility-first CSS framework for rapidly styling web pages

## Requirements

-   Node.js 20.x or later
-   NPM or Yarn

## Installation

1. Install Node.js
2. Download or clone the project's source code:
    ```
    git clone https://github.com/ShynBui/LegalKnowledgeBot.git -b frontend --single-branch frontend && cd frontend
    ```
3. Run the following command to install the necessary dependencies:
    ```
    npm install
    ```

## Usage

1. Create new file ```.env ``` and config 
```
VITE_PUBLIC_URL="/bophapdiendientu/demuc/"
VITE_SERVER_URL="http://localhost:5050"
```
2. **Run the Development Server:** Start the development server to run and test the application locally
    ```
    npm run dev
    ```
3. **Access the Application:** Open your web browser and navigate to `http://localhost:5173` to access the application interface.

4. Sevice Frontend
| Service                      | Endpoints                  |
| ---------------------------- | -------------------------- |
| Pháp điển (Legal field)      | `/phapdien`                |
| Tìm kiếm thuật ngữ (Find Terms) | `/timkiemthuatngu`       |
| Xem thuật ngữ (Filters Terms) | `/thuatngu`                |
| Diễn đàn (Forum)             | `/diendan`                 |
| Hỏi đáp hệ thống (System Q&A)| `/chat`                    |
| Hỏi đáp google (Q&A GG)      | `/chatgg`                  |
And another service, for example is report, login..., you can try when you use above serivce

5. API Backend

| API                         | Endpoints                                     |
| ------------------------------- | --------------------------------------------- |
| User Management                 |                                               |
| - User Login (Đăng nhập người dùng)                    | `/login/`                                     |
| - Current User Information (Thông tin người dùng hiện tại)      | `/current-user/`                              |
| - User Registration (Đăng ký người dùng)             | `/register-user/`                             |
| Legal Field (Lĩnh vực pháp lý)                     |                                               |
| - Legal field topic (Chủ đề pháp điển)            | `/chu_de_phap_dien/`                          |
| - Subtopics under legal field (Đề mục theo chủ đề)           | `/chu_de_phap_dien/<chu_de_id>/de_muc/`       |
| - Indexes under subtopic (Chi mục theo đề mục)           | `/de_muc_phap_dien/<de_muc_id>/chi_muc/`     |
| - Indexes under chapter (Chi mục theo chương )           | `/chuong_va_dieu_phap_dien/<chuong_id>/chi_muc/` |
| - Thuật ngữ (Terminology)                     | `/thuat_ngu/`                                 |
| - Search terminology (Tìm kiếm thuật ngữ)            | `/thuat_ngu/doan_van/`                        |
| - View terminology by ID(Xem thuật ngữ theo ID)          | `/thuat_ngu/<id>/`                            |
| - Search Paragraph (Tìm kiếm đoạn văn)              | `/terminologies/search-paragraph/`            |
| - Get Terminology (Lấy thuật ngữ)                | `/terminologies/`                             |
| - Search Thuật Ngữ (Tìm kiếm thuật ngữ)              | `/search_thuat_ngu/`                          |
| Questions (Câu hỏi)                        |                                               |
| - Get Questions by id (Lấy câu hỏi theo chủ đề)       | `/cau_hoi/<chu_de_id>/`                       |
| - Add Question (Thêm câu hỏi)                   | `/add_cau_hoi/`                               |
| - Get Question by ID (Lấy câu hỏi theo ID)             | `/cau_hoi_by_id/<id>/`                        |
| Answers (Câu trả lời)                      |                                               |
| - Get Answers by Question (Lấy câu trả lời theo câu hỏi)      | `/tra_loi/<cau_hoi_id>/`                      |
| - Add Question (Thêm câu trả lời)               | `/add_tra_loi/`                               |
| - Delete Quesstion by ID (Xóa câu trả lời theo ID)  | `/delete_tra_loi_by_id/<id>/`                 |
| Google Search (Tìm kiếm Google)                   | `/search_gg/`                                 |
| Chat Bot (Bot Chat)                          |                                               |
| - User Chat (Chat người dùng)                     | `/chat/` (GET để lấy, POST để thêm)           |
| Report Users (Ghi nhận báo cáo người dùng)      | `/bao_cao_nguoi_dung/`                        |



## Next steps

-   Add new features
-   Improve the user interface
-   Add tests

## Links

-   React documentation: https://react.dev/
-   Vite documentation: https://vitejs.dev/

## Author

-   [Nguyen Duc Hoang](https://github.com/duchoaang)
-   [Bui Tien Phat](https://github.com/ShynBui)
-   [Tsan Quy Thanh](https://github.com/quythanh)

## License

This project is licensed under the terms of the [Apache License 2.0](http://www.apache.org/licenses/) license.

## Acknowledgments

-   [React](https://react.dev/)
