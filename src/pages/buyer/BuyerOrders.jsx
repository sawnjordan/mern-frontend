import React from "react";

export const BuyerOrders = () => {
  return (
    <section class="col-lg-8">
      <div class="d-flex justify-content-between align-items-center pt-lg-2 pb-4 pb-lg-5 mb-lg-3">
        <div class="d-flex align-items-center">
          <label
            class="d-none d-lg-block fs-sm text-light text-nowrap opacity-75 me-2"
            for="order-sort"
          >
            Sort orders:
          </label>
          <label
            class="d-lg-none fs-sm text-nowrap opacity-75 me-2"
            for="order-sort"
          >
            Sort orders:
          </label>
          <select class="form-select" id="order-sort">
            <option>All</option>
            <option>Delivered</option>
            <option>In Progress</option>
            <option>Delayed</option>
            <option>Canceled</option>
          </select>
        </div>
        <a
          class="btn btn-primary btn-sm d-none d-lg-inline-block"
          href="account-signin.html"
        >
          <i class="ci-sign-out me-2"></i>Sign out
        </a>
      </div>
      <div class="table-responsive fs-md mb-4">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date Purchased</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-3">
                <a
                  class="nav-link-style fw-medium fs-sm"
                  href="#order-details"
                  data-bs-toggle="modal"
                >
                  34VB5540K83
                </a>
              </td>
              <td class="py-3">May 21, 2019</td>
              <td class="py-3">
                <span class="badge bg-info m-0">In Progress</span>
              </td>
              <td class="py-3">$358.75</td>
            </tr>
            <tr>
              <td class="py-3">
                <a
                  class="nav-link-style fw-medium fs-sm"
                  href="#order-details"
                  data-bs-toggle="modal"
                >
                  78A643CD409
                </a>
              </td>
              <td class="py-3">December 09, 2018</td>
              <td class="py-3">
                <span class="badge bg-danger m-0">Canceled</span>
              </td>
              <td class="py-3">
                <span>$760.50</span>
              </td>
            </tr>
            <tr>
              <td class="py-3">
                <a
                  class="nav-link-style fw-medium fs-sm"
                  href="#order-details"
                  data-bs-toggle="modal"
                >
                  112P45A90V2
                </a>
              </td>
              <td class="py-3">October 15, 2018</td>
              <td class="py-3">
                <span class="badge bg-warning m-0">Delayed</span>
              </td>
              <td class="py-3">$1,264.00</td>
            </tr>
            <tr>
              <td class="py-3">
                <a
                  class="nav-link-style fw-medium fs-sm"
                  href="#order-details"
                  data-bs-toggle="modal"
                >
                  28BA67U0981
                </a>
              </td>
              <td class="py-3">July 19, 2018</td>
              <td class="py-3">
                <span class="badge bg-success m-0">Delivered</span>
              </td>
              <td class="py-3">$198.35</td>
            </tr>
            <tr>
              <td class="py-3">
                <a
                  class="nav-link-style fw-medium fs-sm"
                  href="#order-details"
                  data-bs-toggle="modal"
                >
                  502TR872W2
                </a>
              </td>
              <td class="py-3">April 04, 2018</td>
              <td class="py-3">
                <span class="badge bg-success m-0">Delivered</span>
              </td>
              <td class="py-3">$2,133.90</td>
            </tr>
            <tr>
              <td class="py-3">
                <a
                  class="nav-link-style fw-medium fs-sm"
                  href="#order-details"
                  data-bs-toggle="modal"
                >
                  47H76G09F33
                </a>
              </td>
              <td class="py-3">March 30, 2018</td>
              <td class="py-3">
                <span class="badge bg-success m-0">Delivered</span>
              </td>
              <td class="py-3">$86.40</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav
        class="d-flex justify-content-between pt-2"
        aria-label="Page navigation"
      >
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <i class="ci-arrow-left me-2"></i>Prev
            </a>
          </li>
        </ul>
        <ul class="pagination">
          <li class="page-item d-sm-none">
            <span class="page-link page-link-static">1 / 5</span>
          </li>
          <li class="page-item active d-none d-sm-block" aria-current="page">
            <span class="page-link">
              1<span class="visually-hidden">(current)</span>
            </span>
          </li>
          <li class="page-item d-none d-sm-block">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item d-none d-sm-block">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item d-none d-sm-block">
            <a class="page-link" href="#">
              4
            </a>
          </li>
          <li class="page-item d-none d-sm-block">
            <a class="page-link" href="#">
              5
            </a>
          </li>
        </ul>
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              Next<i class="ci-arrow-right ms-2"></i>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};
