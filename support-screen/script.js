  document.querySelectorAll('p[data-content]').forEach(function(p) {
    p.addEventListener('click', function() {
      var targetPage = this.getAttribute('data-content');
      window.location.href = targetPage;
    });
  });